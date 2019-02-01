module Api
  module V1
    class GranulesController < ApplicationController
      def index
        request = Faraday.get('https://cmr.sit.earthdata.nasa.gov/search/granules.' + @extension.to_s + '?echo_collection_id=' + params[:collection_id])

        formatted_response(request.body, @extension, request.status)
      end

      def show
        request = Faraday.get('https://cmr.sit.earthdata.nasa.gov/search/concepts/' + params[:id] + '.' + @extension)

        formatted_response(request.body, @extension, request.status)
      end

      private

      def granule_params
        params.permit(:format, :sort_key, :page_size, :page_num)
      end
    end
  end
end
