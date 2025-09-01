import { ApplicationConfig, inject } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideApollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { ApolloLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

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
        link: ApolloLink.from([auth, httpLink.create({ uri: 'http://172.18.0.5/graphql' })]),
        cache: new InMemoryCache()
      };
    })
  ],
};
