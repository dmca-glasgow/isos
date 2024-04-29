// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted!", name)
// }

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(debug_assertions)] // only include this code on debug builds
      app.get_window("main").unwrap().open_devtools();
      Ok(())
    })
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .plugin(tauri_plugin_fs_watch::init())
    // .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
