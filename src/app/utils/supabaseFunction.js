import { supabase } from "./supabase"; // Make sure supabase client is imported

export const getAllTodos = async () => {
    // Supabase returns both data and a potential error
    const { data, error } = await supabase.from("Todo").select("*");

    // If an error exists, log it and throw it to stop execution
    if (error) {
        console.error("Error fetching todos:", error);
        throw new Error("Could not fetch todos");
    }

    // If there's no error, return the data
    return data;
};

export const addTodo = async (title) => {
  const { data, error } = await supabase
    .from("Todo")
    // idは自動で採番されるので、ここでは指定しない
    // titleカラムに、引数で受け取ったtitleを設定
    .insert({ title: title });

  if (error) {
    console.error("Error adding todo:", error);
    throw new Error("Could not add todo");
  }

  return data;
}

export const deleteTodo = async (id) => {
    await supabase.from("Todo").delete().eq("id",id)
}