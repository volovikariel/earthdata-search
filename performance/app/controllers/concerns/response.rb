module Response
  def formatted_response(object, extension, status = :ok)
    if %w(json umm-json umm_json).include?(extension) || extension.match(/umm_json_v\d_\d{,2}/)
      render json: object, status: status
    elsif %i(xml echo10 iso iso19115 dif dif10 atom native).include?(extension)
      render xml: object, status: status
    else
      render json: { message: 'Extension (.' + extension + ') is not supported.' }, status: :unsupported_media_type
    end
  end
end
