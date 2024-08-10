// // components/SessionProvider.tsx
// import axios from "axios";
// import { FC, ReactNode, useEffect } from "react";
// import { useRouter } from "next/router";

// interface SessionProviderProps {
//   children: ReactNode;
// }

// const URL = process.env.BACKEND_API;

// const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
//   const router = useRouter();

//   const checkSession = async () => {
//     const localStorageData = JSON.parse(localStorage.getItem("tokens") || "{}");
//     if (localStorageData && localStorageData.accesTokenExpiration) {
//       if (localStorageData.accesTokenExpiration <= new Date().getTime()) {
//         const { data: responseData } = await axios.patch(
//           `${URL}/auth/refresh`,
//           {
//             refreshToken: localStorageData.refreshToken,
//           }
//         );
//         localStorage.removeItem("tokens");
//         localStorage.setItem("tokens", JSON.stringify(responseData));
//         router.reload();
//       } else {
//         alert(`AccessToken is alive`);
//       }
//     }
//   };

//   useEffect(() => {
//     checkSession();
//   }, [router.pathname]);

//   return <>{children}</>;
// };

// export default SessionProvider;

// import { store } from "@/redux/store";
// import React from "react";
// import { Provider } from "react-redux";

// const SessionProvider = ({ childen }) => {
//   return <Provider store={store}></Provider>;
// };

// export default SessionProvider;
