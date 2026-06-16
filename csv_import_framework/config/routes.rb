Rails.application.routes.draw do
  get "imports/index"
  get "imports/new"
  get "imports/create"
  get "imports/show"
  root "imports#index"

  resources :imports, only: [ :index, :new, :create, :show ]
end
