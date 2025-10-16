import { ApplicationLayout } from '@/components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your Spend Guard settings have been updated successfully.'
    });
  };

  return (
    <ApplicationLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Spend Guard Settings</h1>
          <p className="text-muted-foreground">Configure risk thresholds and alert rules</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alert Thresholds</CardTitle>
            <CardDescription>Configure when alerts should be triggered</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="price-variance">Price Variance Threshold (%)</Label>
              <Input id="price-variance" type="number" defaultValue="30" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fraud-score">Fraud Risk Score Threshold</Label>
              <Input id="fraud-score" type="number" defaultValue="70" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duplicate-match">Duplicate Invoice Match Threshold (%)</Label>
              <Input id="duplicate-match" type="number" defaultValue="90" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dashboard-alerts">Dashboard Notifications</Label>
              <Switch id="dashboard-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-summary">Daily Summary Report</Label>
              <Switch id="daily-summary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auto-Actions</CardTitle>
            <CardDescription>Configure automatic responses to detected risks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-flag">Auto-flag High Risk Transactions</Label>
              <Switch id="auto-flag" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-hold">Auto-hold Duplicate Invoices</Label>
              <Switch id="auto-hold" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-notify">Auto-notify Approvers</Label>
              <Switch id="auto-notify" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
}
