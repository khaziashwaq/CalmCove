"use server";

export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("registered");

  const fields = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  return {
    ...prevState,
    data: fields,
  };

  console.log(fields);
}
