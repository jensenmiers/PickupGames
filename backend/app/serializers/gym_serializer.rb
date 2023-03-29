class GymSerializer < ActiveModel::Serializer
  attributes :id, :gym_name, :address, :gym_phone_number, :general_hours, :parking_tips, :membership_fees
end
