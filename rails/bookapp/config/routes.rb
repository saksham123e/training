Rails.application.routes.draw do
  resources :books
 get "books/test_data", to: "books#test_data"
end
