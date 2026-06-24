Rails.application.routes.draw do
  namespace :admin do
    get "dashboard", to: "dashboard#index"
  end

  root "admin/dashboard#index"
end
