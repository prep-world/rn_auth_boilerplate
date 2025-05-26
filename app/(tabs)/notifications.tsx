import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen: React.FC = () => {
  // Mock notification data
  const notifications = [
    {
      id: '1',
      title: 'Booking Confirmed',
      message: 'Your parking at Downtown Parking has been confirmed.',
      time: '10 minutes ago',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Parking Session Started',
      message: 'Your parking session at City Mall Garage has started.',
      time: '2 hours ago',
      read: true,
      type: 'info'
    },
    {
      id: '3',
      title: 'Special Offer',
      message: 'Get 20% off on your next parking session.',
      time: '1 day ago',
      read: true,
      type: 'promo'
    },
    {
      id: '4',
      title: 'Booking Reminder',
      message: 'Your parking session at Central Plaza Parking is scheduled for tomorrow.',
      time: '2 days ago',
      read: true,
      type: 'reminder'
    },
    {
      id: '5',
      title: 'Payment Successful',
      message: 'Your payment of $5.00 has been processed successfully.',
      time: '3 days ago',
      read: true,
      type: 'success'
    }
  ];
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success':
        return { name: 'checkmark-circle', color: '#22c55e', bg: 'bg-green-100' };
      case 'info':
        return { name: 'information-circle', color: '#3b82f6', bg: 'bg-blue-100' };
      case 'promo':
        return { name: 'gift', color: '#a855f7', bg: 'bg-purple-100' };
      case 'reminder':
        return { name: 'alarm', color: '#f97316', bg: 'bg-orange-100' };
      default:
        return { name: 'notifications', color: '#6b7280', bg: 'bg-gray-100' };
    }
  };
  
  // Render each notification item
  const renderNotificationItem = ({ item }: { item: typeof notifications[0] }) => {
    const icon = getNotificationIcon(item.type);
    
    return (
      <TouchableOpacity className={`p-4 border-b border-gray-100 ${item.read ? 'bg-white' : 'bg-blue-50'}`}>
        <View className="flex-row">
          <View className={`w-10 h-10 ${icon.bg} rounded-full items-center justify-center mr-3`}>
            <Ionicons name={icon.name} size={20} color={icon.color} />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-800 font-semibold">{item.title}</Text>
              <Text className="text-gray-400 text-xs">{item.time}</Text>
            </View>
            <Text className="text-gray-600 mt-1">{item.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-blue-600 pt-12 pb-4 px-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">Notifications</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-white">Mark all as read</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerClassName="pb-4"
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <Ionicons name="notifications-off" size={60} color="#d1d5db" />
            <Text className="text-gray-400 mt-4 text-lg">No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationScreen;