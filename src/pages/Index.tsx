import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

const mockUsers: User[] = [
  { id: 1, login: 'admin', fullName: 'Администратор Системы', email: 'admin@company.com', roles: ['Администратор', 'Модератор'] },
  { id: 2, login: 'manager', fullName: 'Иван Петров', email: 'manager@company.com', roles: ['Менеджер'] },
  { id: 3, login: 'user1', fullName: 'Мария Сидорова', email: 'user1@company.com', roles: ['Пользователь'] },
  { id: 4, login: 'analyst', fullName: 'Алексей Кузнецов', email: 'analyst@company.com', roles: ['Аналитик', 'Модератор'] },
];

const mockRoles: Role[] = [
  { id: '1', name: 'Администратор', category: 'Управление' },
  { id: '2', name: 'Модератор', category: 'Управление' },
  { id: '3', name: 'Менеджер', category: 'Бизнес' },
  { id: '4', name: 'Аналитик', category: 'Бизнес' },
  { id: '5', name: 'Пользователь', category: 'Основные' },
  { id: '6', name: 'Гость', category: 'Основные' },
];

const Index = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [editForm, setEditForm] = useState({
    login: '',
    fullName: '',
    email: '',
    roles: [] as string[]
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      login: user.login,
      fullName: user.fullName,
      email: user.email,
      roles: user.roles
    });
    setIsEditModalOpen(true);
  };

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
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

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
        {/* Боковое меню */}
        <aside 
          className={`bg-sidebar border-r transition-all duration-300 ${
            sidebarExpanded ? 'w-64' : 'w-16'
          }`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <nav className="p-4 space-y-2">
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="Users" size={20} />
              <span className={`transition-opacity duration-300 ${
                sidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                Пользователи
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="Settings" size={20} />
              <span className={`transition-opacity duration-300 ${
                sidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                Настройки
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="BarChart3" size={20} />
              <span className={`transition-opacity duration-300 ${
                sidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                Аналитика
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-colors">
              <Icon name="FileText" size={20} />
              <span className={`transition-opacity duration-300 ${
                sidebarExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                Отчеты
              </span>
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

      {/* Модальное окно редактирования */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Icon name="UserCog" size={20} />
              <span>Редактирование пользователя</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
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
              <div className="border rounded-sm p-4 max-h-40 overflow-y-auto">
                <div className="space-y-3">
                  {Object.entries(
                    mockRoles.reduce((acc, role) => {
                      if (!acc[role.category]) acc[role.category] = [];
                      acc[role.category].push(role);
                      return acc;
                    }, {} as Record<string, Role[]>)
                  ).map(([category, roles]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Отменить
              </Button>
              <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;