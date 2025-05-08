import { authAtom, signOutAction } from "@/atoms/auth";
import { jotaiStore } from "@/stores/jotaiStore";
import ky, { type Options } from "ky";
import { refreshToken } from "../others/auth";
import { ENV } from "@/utils/constants";
const TIMEOUT = 60000;

export const apiInstance = ky.create({
  prefixUrl: ENV.VITE_APP_API_URL,
  timeout: TIMEOUT,
  hooks: {
    beforeRequest: [
      (request) => {
        const authInfo = jotaiStore.get(authAtom);
        if (authInfo?.accessToken) {
          request.headers.set(
            "Authorization",
            `${authInfo.tokenType} ${authInfo.accessToken}`
          );
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // For non-error responses, just return the response
        if (response.ok) {
          return response;
        }

        // Handle 401 Unauthorized errors for token refresh
        if (response.status === 401) {
          const originalRequestOptions = options as Options & {
            _retry?: boolean;
          };

          if (originalRequestOptions._retry) {
            signOutAction();
            return new Response(
              JSON.stringify({ message: "Session expired after retry." }),
              { status: 401 }
            );
          }

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(async (newAuthToken: any) => {
                // Assuming newAuthToken has accessToken and tokenType
                const newOptions = {
                  ...originalRequestOptions,
                  headers: {
                    ...originalRequestOptions.headers,
                    Authorization: `${newAuthToken.tokenType} ${newAuthToken.accessToken}`,
                  },
                  _retry: true, // Mark as retried
                };
                return ky(request, newOptions);
              })
              .catch((err) => {
                // If queuing failed, propagate the error
                // Or handle by returning a new Response indicating failure
                return new Response(JSON.stringify(err), { status: 401 });
              });
          }

          originalRequestOptions._retry = true;
          isRefreshing = true;

          try {
            const newAuthToken = await refreshToken(); // This should return { accessToken, tokenType }

            jotaiStore.set(authAtom, {
              ...jotaiStore.get(authAtom),
              ...newAuthToken,
            });

            processQueue(null, newAuthToken);

            // Retry the original request with the new token
            const newOptions = {
              ...originalRequestOptions,
              headers: {
                ...originalRequestOptions.headers,
                Authorization: `${newAuthToken.tokenType} ${newAuthToken.accessToken}`,
              },
            };
            return ky(request, newOptions);
          } catch (err) {
            processQueue(err, null);
            signOutAction(); // Sign out if token refresh fails
            // Propagate the error or return a new Response
            // throw new HTTPError(response, request, options); // Re-throw original error
            return new Response(
              JSON.stringify({ message: "Failed to refresh token." }),
              { status: 401 }
            );
          } finally {
            isRefreshing = false;
          }
        }

        // For other errors, re-throw an HTTPError or return the response to let ky handle it
        // This ensures that ky's default error handling (throwing HTTPError) still applies for non-401s
        return response; // Or throw new HTTPError(response, request, options);
      },
    ],
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (tokenOrResponse: any) => void; // Can resolve with new token or a ky response
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token); // This token will be used by queued requests to retry
    }
  });

  failedQueue = [];
};
