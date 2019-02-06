module Api
  module V1
    class CollectionsController < ApplicationController
      def index
        request = Faraday.get('https://cmr.sit.earthdata.nasa.gov/search/collections.' + @extension.to_s + '?' + collection_params.to_query)

        formatted_response(request.body, @extension, request.status)
      end

      def show
        request = Faraday.get('https://cmr.sit.earthdata.nasa.gov/search/concepts/' + params[:id] + '.' + @extension.to_s)

        formatted_response(request.body, @extension, request.status)
      end

      private

      def collection_params
        params.permit(:format, :sort_key, :page_size, :page_num, :has_granules, :include_granule_counts, :include_facets, :keyword, :temporal, :concept_id, :polygon, :bounding_box, :point, :line)
      end
    end
  end
end
