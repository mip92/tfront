import { pageSEO } from '../../components/SEOMetadata';
import { WarehouseClient } from './WarehouseClient';

export const metadata = pageSEO.warehouse();

export default function WarehousePage() {
  return <WarehouseClient />;
}
