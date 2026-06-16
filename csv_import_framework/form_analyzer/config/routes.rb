Rails.application.routes.draw do
  root "forms#index"

  post "analyze", to: "forms#analyze"
end
