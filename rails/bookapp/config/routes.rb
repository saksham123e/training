Rails.application.routes.draw do
  resources :books
 get "books/test_data", to: "books#test_data"
end
Rails.application.routes.draw do
  resources :books

  # 👇 YAHAN ADD KAR
  get "books/full_info", to: "books#full_info"
  get "books/search", to: "books#search"
end
