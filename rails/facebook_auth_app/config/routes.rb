Rails.application.routes.draw do
  get "dashboard/index"
  get "dashboard/profile"
  get "pages/home"
  devise_for :users, controllers: {
  omniauth_callbacks: "users/omniauth_callbacks"
}

  root "pages#home"

  get "dashboard", to: "dashboard#index"
  get "profile", to: "dashboard#profile"
end
