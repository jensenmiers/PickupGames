Rails.application.routes.draw do
  resources :signed_up_players
  resources :games do
    get 'signed_up_players', on: :member
  end

  resources :gyms
  
  resources :players, only: [:index, :show, :update] do
    get '/my_rsvps', to: 'signed_up_players#my_rsvps'
  end

  post "/signup", to: "players#create"
  get "/me", to: "players#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
end
