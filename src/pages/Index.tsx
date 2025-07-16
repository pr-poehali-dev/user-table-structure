import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import UserEdit from './UserEdit';

interface User {
  id: number;
  login: string;
  fullName: string;
  email: string;
  roles: string[];
}

const mockUsers: User[] = [
  { id: 1, login: 'admin', fullName: 'Администратор Системы', email: 'admin@company.com', roles: ['Администратор', 'Модератор'] },
  { id: 2, login: 'manager', fullName: 'Иван Петров', email: 'manager@company.com', roles: ['Менеджер'] },
  { id: 3, login: 'user1', fullName: 'Мария Сидорова', email: 'user1@company.com', roles: ['Пользователь'] },
  { id: 4, login: 'analyst', fullName: 'Алексей Кузнецов', email: 'analyst@company.com', roles: ['Аналитик', 'Модератор'] },
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUserId(user.id);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUserId(null);
  };

  if (currentView === 'edit' && selectedUserId) {
    return <UserEdit userId={selectedUserId} onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Шапка */}
      <header className="bg-primary text-primary-foreground shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={24} />
              <span className="text-xl font-semibold">AdminPanel</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/10">
              <Icon name="User" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/10">
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Боковое меню - всегда открытое */}
        <aside className="w-64 bg-sidebar border-r">
          <nav className="p-4 space-y-2">
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="Users" size={20} />
              <span>Пользователи</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="Settings" size={20} />
              <span>Настройки</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="BarChart3" size={20} />
              <span>Аналитика</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="FileText" size={20} />
              <span>Отчеты</span>
            </div>
          </nav>
        </aside>

        {/* Основной контент */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Управление пользователями</h1>
            <p className="text-muted-foreground">Просмотр и редактирование пользователей системы</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span>Список пользователей</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Логин</TableHead>
                    <TableHead>Имя пользователя</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роли</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow 
                      key={user.id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleUserClick(user)}
                    >
                      <TableCell className="font-medium">{user.login}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.map((role) => (
                            <Badge key={role} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;