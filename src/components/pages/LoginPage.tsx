"use client";
import React from "react";
import scss from "./styles/LoginPage.module.scss";
import Image from "next/image";
import { AiFillFacebook } from "react-icons/ai";
import { Roboto } from "next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostLoginUserMutation } from "@/redux/api/auth";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const roboto = Roboto({ subsets: ["latin"], weight: "100" });

const LoginPage = () => {
  const provider = new FacebookAuthProvider();
  const { register, handleSubmit } = useForm<AUTH.PostLoginRequest>();
  const [postLoginUser] = usePostLoginUserMutation();

  const onSubmit: SubmitHandler<AUTH.PostLoginRequest> = async (data) => {
    console.log(data);
    try {
      const responsedata = await postLoginUser(data);
      console.log(responsedata, "response");
      localStorage.setItem("tokens", JSON.stringify(responsedata.data));
    } catch (error) {
      alert(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      await postLoginUser({ token }).unwrap();
      console.log("Facebook login successful");
    } catch (error) {
      console.error("Failed to log in with Facebook", error);
    }
  };
  return (
    <div className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={roboto.className}>Instagram</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email")}
              placeholder="Телефон, имя пользователя или эл.адрес"
              type="text"
            />
            <input {...register("password")} placeholder="Пароль" type="text" />
            <button type="submit">Войти</button>
          </form>
          <div style={{ display: "flex", gap: "9px" }} className="or">
            <div
              className="line"
              style={{
                border: "1px solid #000",
                opacity: "0.2",
                width: "110px",
                height: "0",
                margin: "8px 0 0 7px",
              }}
            ></div>
            <p>ИЛИ</p>
            <div
              className="line"
              style={{
                border: "1px solid #000",
                opacity: "0.2",
                width: "110px",
                margin: "8px 0 0 7px",
                height: "0",
              }}
            ></div>
          </div>
          <div onClick={handleFacebookLogin} className={scss.facebook}>
            <AiFillFacebook style={{ fontSize: "27px" }} />
            <>Войти через Facebook</>
          </div>
          <a
            style={{
              padding: "22px 0 0 0",
              textDecoration: "none",
              color: "#668bf2",
            }}
            href="/auth/forgot"
          >
            Забыли пароль ?
          </a>
        </div>
      </div>
      <div className={scss.account}>
        <p>
          У вас ещё нет аккаунта?{" "}
          <a href="/auth/sign-up" style={{ color: "#2860fb" }}>
            Зарегистироваться
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
