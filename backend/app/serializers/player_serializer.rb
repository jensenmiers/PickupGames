class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username, :player_email, :player_phone_number
end
