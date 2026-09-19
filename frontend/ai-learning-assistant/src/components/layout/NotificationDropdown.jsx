import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Trash2, Sparkles, BookOpen, BrainCircuit, FileText, CheckCircle2, X } from 'lucide-react';
import moment from 'moment';
import { useAuth } from '../../context/AuthContext';

const NotificationDropdown = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const storageKey = `notifications_${user?._id || user?.id || 'guest'}`;

    const getInitialNotifications = () => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch {
            // fallback
        }
        return [
            {
                id: '1',
                title: 'Welcome to AI Learning Assistant!',
                message: 'Upload your first PDF document to generate summaries, flashcards, and quizzes.',
                type: 'welcome',
                link: '/documents',
                read: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            },
            {
                id: '2',
                title: 'AI Study Tools Ready',
                message: 'Practice with interactive quizzes and smart flashcards to test your knowledge.',
                type: 'flashcard',
                link: '/flashcards',
                read: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            },
            {
                id: '3',
                title: 'Daily Study Streak',
                message: 'Track your learning statistics and completed quizzes on your dashboard.',
                type: 'progress',
                link: '/dashboard',
                read: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
            }
        ];
    };

    const [notifications, setNotifications] = useState(getInitialNotifications);

    // Save to localStorage whenever notifications change
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(notifications));
        } catch {
            // ignore
        }
    }, [notifications, storageKey]);

    // Listen for custom app notifications
    useEffect(() => {
        const handleNewNotification = (e) => {
            if (!e.detail) return;
            const newNotif = {
                id: Date.now().toString(),
                title: e.detail.title || 'New Notification',
                message: e.detail.message || '',
                type: e.detail.type || 'info',
                link: e.detail.link,
                read: false,
                createdAt: new Date().toISOString(),
            };
            setNotifications(prev => [newNotif, ...prev]);
        };

        window.addEventListener('app:notification', handleNewNotification);
        return () => window.removeEventListener('app:notification', handleNewNotification);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleNotificationClick = (item) => {
        // Mark as read
        setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
        setIsOpen(false);
        if (item.link) {
            navigate(item.link);
        }
    };

    const handleDeleteNotification = (e, id) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'welcome':
            case 'ai':
                return (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Sparkles className="w-4 h-4" />
                    </div>
                );
            case 'flashcard':
                return (
                    <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <BookOpen className="w-4 h-4" />
                    </div>
                );
            case 'quiz':
                return (
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                        <BrainCircuit className="w-4 h-4" />
                    </div>
                );
            case 'document':
                return (
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <FileText className="w-4 h-4" />
                    </div>
                );
            case 'progress':
            default:
                return (
                    <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                );
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 group ${
                    isOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label="Notifications"
                aria-expanded={isOpen}
            >
                <Bell size={20} strokeWidth={2} className="group-hover:scale-105 transition-transform duration-200" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
                    </span>
                )}
            </button>

            {/* Dropdown Popover */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-900/15 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>

                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                <CheckCheck className="w-3.5 h-3.5" />
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                            <div className="py-12 px-4 text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                    <Bell className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <p className="text-sm font-medium text-slate-700">No notifications</p>
                                <p className="text-xs text-slate-400 mt-1">You are all caught up!</p>
                            </div>
                        ) : (
                            notifications.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleNotificationClick(item)}
                                    className={`group flex items-start gap-3 p-3.5 hover:bg-slate-50/90 transition-colors cursor-pointer relative ${
                                        !item.read ? 'bg-emerald-50/30' : ''
                                    }`}
                                >
                                    {getIcon(item.type)}

                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <p className={`text-xs font-semibold truncate ${!item.read ? 'text-slate-900' : 'text-slate-700'}`}>
                                                {item.title}
                                            </p>
                                            {!item.read && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-1">
                                            {item.message}
                                        </p>
                                        <span className="text-[10px] font-medium text-slate-400">
                                            {moment(item.createdAt).fromNow()}
                                        </span>
                                    </div>

                                    {/* Delete Button on Hover */}
                                    <button
                                        onClick={(e) => handleDeleteNotification(e, item.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Delete notification"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-medium">
                                {notifications.length} total
                            </span>
                            <button
                                onClick={handleClearAll}
                                className="inline-flex items-center gap-1 text-slate-500 hover:text-red-600 font-medium transition-colors"
                            >
                                <Trash2 className="w-3 h-3" />
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
