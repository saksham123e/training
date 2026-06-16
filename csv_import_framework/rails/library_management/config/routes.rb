Rails.application.routes.draw do
  devise_for :users
  root "books#index"

  resources :books

  resources :issues do
    member do
      patch :return_book
    end
  end
end