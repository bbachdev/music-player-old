// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod library;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn scan(paths: Vec<&str>) -> String {
  println!("Scanning paths: {:?}", paths);
  paths[0].to_string()
}

fn main() {
  let _ = fix_path_env::fix();
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet, scan])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
