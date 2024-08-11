"use client";
import React from "react";
import scss from "./styles/Register.module.scss";
import { Roboto } from "next/font/google";
import { AiFillFacebook } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostRegisterUserMutation } from "@/redux/api/auth";
import Link from "next/link";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import { log } from "console";

const roboto = Roboto({ subsets: ["latin"], weight: "100" });

const Register = () => {
  const provider = new FacebookAuthProvider();
  const { register, handleSubmit } = useForm<AUTH.PostRegisterRequest>();
  const [postRegisterUser] = usePostRegisterUserMutation();

  const onSubmit: SubmitHandler<AUTH.PostRegisterRequest> = async (data) => {
    console.log(data);
    try {
      const response = await postRegisterUser(data).unwrap();
      console.log("Registration successful");
      localStorage.setItem("tokens", JSON.stringify(response));
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      await postRegisterUser({ token }).unwrap();
      console.log("Facebook login successful");
    } catch (error) {
      console.error("Failed to log in with Facebook", error);
    }
  };

  return (
    <div className={scss.Register}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.inst}>
            <h1 className={roboto.className}>Instagram</h1>
            <p>
              Зарегистрируйтесь, чтобы <br /> смотреть фото и видео ваших друзей
            </p>
          </div>
          <div className={scss.facebook}>
            <button onClick={handleFacebookLogin}>
              <AiFillFacebook style={{ fontSize: "27px" }} />
              Войти через Facebook
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "9px",
              marginTop: "-10px",
              alignItems: "center",
            }}
            className="or"
          >
            <div
              className="line"
              style={{
                border: "1px solid #000",
                opacity: "0.2",
                width: "110px",
                height: "0",
                margin: "7px 0 0 7px",
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Моб.телефон или эл.адрес"
              type="text"
              {...register("email")}
            />
            <input
              {...register("surname")}
              placeholder="Имя и фамилия"
              type="text"
            />
            <input
              {...register("username")}
              placeholder="Имя пользователя"
              type="text"
            />
            <input
              placeholder="Пароль"
              type="password"
              {...register("password")}
            />
            <input placeholder="Photo" type="text" {...register("photo")} />
            <div className={scss.rules}>
              <p>
                Люди, которые пользуются нашим сервисом, <br /> могли загрузить
                вашу контактную информацию <br /> в Instagram.
                <span style={{ color: "#668bf2" }}>
                  <Link
                    style={{ textDecorationLine: "none", color: "#2860fb" }}
                    href="https://www.facebook.com/help/instagram/261704639352628"
                  >
                    Подробнее
                  </Link>
                </span>
              </p>
              <p>
                Регистрируясь, вы принимаете наши{" "}
                <span style={{ color: "#2860fb" }}>
                  Условия <br />
                  <Link
                    style={{ textDecorationLine: "none", color: "#2860fb" }}
                    href="https://privacycenter.instagram.com/policies/cookies/"
                  >
                    {" "}
                    Политику конфиденциальности и Политику <br /> в отношении
                    файлов cookie.
                  </Link>
                </span>
              </p>
            </div>
            <button type="submit">Регистрация</button>
          </form>
        </div>
      </div>
      <div className={scss.account}>
        <p>
          Есть аккаунт?{" "}
          <a href="/auth/sign-in" style={{ color: "#2860fb" }}>
            Вход
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
