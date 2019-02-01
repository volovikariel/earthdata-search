class ApplicationController < ActionController::API
  include Response

  before_action :set_extension

  def set_extension
    # This is a default rails parameter so we may want to consider using a different key/value to avoid conflicts
    @extension = params.delete(:format)
  end
end
