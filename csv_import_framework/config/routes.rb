Rails.application.routes.draw do
  root "imports#index"

  resources :imports, only: [ :index, :new, :create, :show, :destroy ] do
    member do
      get :error_report
    end
  end
end
