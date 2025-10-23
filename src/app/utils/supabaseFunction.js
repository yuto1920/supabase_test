import { supabase } from "./supabase"; // Make sure supabase client is imported

export const getAllTodos = async () => {
    // Supabase returns both data and a potential error
    const { data, error } = await supabase.from("todos").select("*");

    // If an error exists, log it and throw it to stop execution
    if (error) {
        console.error("Error fetching todos:", error);
        throw new Error("Could not fetch todos");
    }

    // If there's no error, return the data
    return data;
};

export const addTodo = async (title) => {
   const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("ログイン情報を取得できませんでした");
    throw new Error("ログインしていません");
  }
  console.log("user",user)
  const { data, error } = await supabase
    .from("todos")
    // idは自動で採番されるので、ここでは指定しない
    // titleカラムに、引数で受け取ったtitleを設定
    .insert({ title: title , user_id: user.id});

  if (error) {
    console.error("Error adding todo:", error);
    throw new Error("Could not add todo");
  }

  return data;
}

export const deleteTodo = async (id) => {
  await supabase.from("todos").delete().eq("id",id)
}

export const addUser = async ( id,email, name) => {
  const { data, error} = await supabase
  .from("profiles")
  .insert({ id: id,email: email, name: name})

  if (error) {
    console.error("Error addUser",error);
    throw new Error("Could not add user")
  }

  return data
}

export const updataUser = async (id,email,name) => {
  await supabase.from("profiles").upsert([
  { id: id, email, name }
]);
}