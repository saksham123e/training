Rails.application.routes.draw do
  root "books#index"

  resources :books

  resources :issues do
    member do
      patch :return_book
    end
  end
end