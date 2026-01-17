import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "@/shared/model/store/store";
import "./index.css";

export async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("@/shared/api/mocks/browser");
  
  // Получаем базовый URL API из конфига
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
  
  return worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
    onUnhandledRequest: (request, print) => {
      const url = new URL(request.url);
      const currentOrigin = window.location.origin;
      
      // Пропускаем все внешние URL (не наш домен) - они не должны обрабатываться MSW
      if (url.origin !== currentOrigin) {
        return; // Не обрабатываем внешние запросы
      }
      
      // Пропускаем статические ресурсы (изображения, CSS, JS из node_modules и т.д.)
      if (
        url.pathname.startsWith("/src/") ||
        url.pathname.startsWith("/node_modules/") ||
        url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i)
      ) {
        return;
      }
      
      // Для необработанных запросов к нашему API показываем предупреждение
      if (url.pathname.startsWith(apiBaseUrl)) {
        print.warning();
      }
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
});
