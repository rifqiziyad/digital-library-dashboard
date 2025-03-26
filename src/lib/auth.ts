// lib/auth.ts
"use client";
// import axios from "axios";
import Cookies from "js-cookie";

// const API_URL = "http://localhost:3000/api"; // Ganti dengan URL backend-mu

export async function login(username: string, password: string) {
  // try {
  // const { data } = await axios.post(`${API_URL}/login`, {
  //   username,
  //   password,
  // });

  // Simpan token di cookie (bisa juga di localStorage)
  Cookies.set("token", `token${username + password}`, { expires: 7 }); // Simpan 7 hari
  //   return data;
  // } catch (error) {
  //   throw new Error("Login gagal. Cek kredensial Anda.");
  // }
}

export function getToken() {
  return Cookies.get("token");
}

export function logout() {
  Cookies.remove("token");
}
