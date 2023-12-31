import type {OrderWithNodes} from '../../types';
import { OrderCard } from './OrderCard.client';

type Props = {
  orders?: OrderWithNodes[];
};

export default function AccountOrderHistory({orders}: Props) {
  return (
    <div>
      <h2>Order History</h2>
      <div className="mt-6">
        {!orders?.length && <p>You haven&apos;t placed any orders yet.</p>}

        {!!orders?.length && <Orders orders={orders} />}
      </div>
    </div>
  );
}

function Orders({orders}: {orders: OrderWithNodes[]}) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
