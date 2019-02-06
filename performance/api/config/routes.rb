Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1, as: nil do
      resources :collections, only: [:index, :show] do
        resources :granules, only: [:index]
      end
      resources :granules, only: [:show]
    end
  end
end
