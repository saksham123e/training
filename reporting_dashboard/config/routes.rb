Rails.application.routes.draw do
  namespace :admin do
    get "report_executions/show"
    get "dashboard", to: "dashboard#index"
    resources :report_executions, only: [:show]
  end

  root "admin/dashboard#index"
end
