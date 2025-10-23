import { ApplicationConfig, inject } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideApollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import {environment} from "../../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch()
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const auth = setContext(() => {
        const token = localStorage.getItem("jwtToken");

        if (token === null) {
          return {};
        } else {
          return {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
      });

      return {
        link: httpLink.create({ uri: environment.GRAPHQL_API_URL + 'graphql' }),
        cache: new InMemoryCache()
      };
    })
  ],
};
