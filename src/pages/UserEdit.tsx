import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  login: string;
  fullName: string;
  email: string;
  roles: string[];
}

interface Role {
  id: string;
  name: string;
  category: string;
}

const mockRoles: Role[] = [
  { id: '1', name: 'Администратор', category: 'Управление' },
  { id: '2', name: 'Модератор', category: 'Управление' },
  { id: '3', name: 'Менеджер', category: 'Бизнес' },
  { id: '4', name: 'Аналитик', category: 'Бизнес' },
  { id: '5', name: 'Пользователь', category: 'Основные' },
  { id: '6', name: 'Гость', category: 'Основные' },
];

const UserEdit = ({ userId, onBack }: { userId: number; onBack: () => void }) => {
  // В реальном приложении здесь был бы запрос к API
  const mockUser: User = {
    id: userId,
    login: 'admin',
    fullName: 'Администратор Системы',
    email: 'admin@company.com',
    roles: ['Администратор', 'Модератор']
  };

  const [editForm, setEditForm] = useState({
    login: mockUser.login,
    fullName: mockUser.fullName,
    email: mockUser.email,
    roles: mockUser.roles
  });

  const handleRoleToggle = (roleName: string) => {
    setEditForm(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(r => r !== roleName)
        : [...prev.roles, roleName]
    }));
  };

  const handleSave = () => {
    console.log('Сохранение пользователя:', editForm);
    onBack();
  };

  const handleCancel = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Шапка */}
      <header className="bg-primary text-primary-foreground shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary/10"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
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
        {/* Боковое меню */}
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
            <div className="flex items-center space-x-2 mb-2">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
                <Icon name="ArrowLeft" size={16} />
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Редактирование пользователя</h1>
            </div>
            <p className="text-muted-foreground ml-8">Изменение данных пользователя системы</p>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="UserCog" size={20} />
                <span>Данные пользователя</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  value={editForm.login}
                  onChange={(e) => setEditForm(prev => ({ ...prev, login: e.target.value }))}
                  className="rounded-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">ФИО</Label>
                <Input
                  id="fullName"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="rounded-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="rounded-sm"
                />
              </div>

              <div className="space-y-3">
                <Label>Роли пользователя</Label>
                <div className="space-y-2 mb-3">
                  <div className="flex flex-wrap gap-2">
                    {editForm.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="border rounded-sm p-4 max-h-64 overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(
                      mockRoles.reduce((acc, role) => {
                        if (!acc[role.category]) acc[role.category] = [];
                        acc[role.category].push(role);
                        return acc;
                      }, {} as Record<string, Role[]>)
                    ).map(([category, roles]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground border-b pb-1">
                          {category}
                        </h4>
                        <div className="space-y-2 ml-4">
                          {roles.map((role) => (
                            <div key={role.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={role.id}
                                checked={editForm.roles.includes(role.name)}
                                onCheckedChange={() => handleRoleToggle(role.name)}
                              />
                              <Label htmlFor={role.id} className="text-sm font-normal cursor-pointer">
                                {role.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Отменить
                </Button>
                <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
                  Сохранить
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UserEdit;