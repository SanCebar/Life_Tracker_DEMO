import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

export const useRegistrationForm = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    //if user is logged in, redirect to activity page
    if (user?.username) {
      navigate("/activity");
    }
  }, [user, navigate]);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.registerUser({
      email: form.email,
      username: form.username,
      password: form.password,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data?.user) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }

    setIsLoading(false);
  };

  return { form, errors, isLoading, handleOnInputChange, handleOnSubmit };
};
