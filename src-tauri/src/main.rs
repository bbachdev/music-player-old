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
fn scan() -> String {
    library::scan().to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, scan])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
