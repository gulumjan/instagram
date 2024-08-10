"use client";
import scss from "./styles/ForgorPassword.module.scss";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useForgotpasswordMutation } from "@/redux/api/auth";
import Link from "next/link";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<AUTH.ForgotPasswordRequest>();
  const [forgotpassword] = useForgotpasswordMutation();

  const onSubmit: SubmitHandler<AUTH.ForgotPasswordRequest> = async (data) => {
    console.log(data);
    const newData = {
      email: data.email,
      frontEndUrl: window.location.href,
    };
    console.log(newData);

    try {
      const responsePassword = await forgotpassword(newData).unwrap();
      confirm(
        `Мы отправили ссылку для восстановления доступа  к вашему аккаунту на адрес ${newData.email}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={scss.Forgot}>
      <div className="container">
        <div className={scss.content}>
          <LockResetIcon
            sx={{ width: "136px", height: "135px", marginTop: "-45px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4>Не удается войти ?</h4>
            <p>
              Введите свой электронный адрес,имя <br /> пользователя или номер
              телефона, и мы <br /> отправим вам ссылку для восстановления{" "}
              <br /> доступа к аккаунту.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email")}
              placeholder="Телефон, имя пользователя или эл.адрес"
              type="text"
            />
            <button type="submit">Получить ссылку для входа</button>
            <Link
              style={{ textDecorationLine: "none" }}
              href="https://help.instagram.com/374546259294234"
            >
              Не можете сбросить пароль ?
            </Link>
          </form>
          <div style={{ display: "flex", gap: "9px" }} className="or">
            <div
              className="line"
              style={{
                border: "1px solid #000",
                opacity: "0.2",
                width: "110px",
                height: "0",
                margin: "27px 0 0 7px",
              }}
            ></div>
            <p>ИЛИ</p>
            <div
              className="line"
              style={{
                border: "1px solid #000",
                opacity: "0.2",
                width: "110px",
                margin: "27px 0 0 7px",
                height: "0",
              }}
            ></div>
          </div>
          <div className={scss.facebook}>
            <Link
              style={{ textDecorationLine: "none", color: "#000" }}
              href="/auth/sign-up"
            >
              Создать новый аккаунт
            </Link>
          </div>
        </div>
        <div className={scss.account}>
          <Link href="/auth/sign-in">Вернуться к входу</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
