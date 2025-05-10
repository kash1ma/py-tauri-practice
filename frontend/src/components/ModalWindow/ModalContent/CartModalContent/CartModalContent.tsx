import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartCount,
  selectCost,
} from "../../../../features/cart/cartSlice";
import Button from "../../../../ui/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";
import Input from "../../../../ui/Input/Input";
import { TypesInput } from "../../../../types/enums/InputEnums";
import { useNavigate } from "react-router-dom";
import handleCloseModal from "../../../../helpers/closeModal";

const CartModalContent = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const pizzaCount = useSelector(selectCartCount);
  const cost = useSelector(selectCost);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '20px',
      color: '#fff',
      maxHeight: '70vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid #333'
      }}>
        <h2 style={{ color: '#ff7b25', margin: 0, fontSize: '1.5rem' }}>Корзина</h2>
        {items.length > 0 && (
          <Button
            text="Очистить корзину"
            onClick={() => dispatch(clearCart())}
            otherButtonStyles={{
              background: 'transparent',
              color: '#ff7b25',
              border: '1px solid #ff7b25',
              padding: '8px 12px',
              transition: 'all 0.2s ease'
            }}
          />
        )}
      </div>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '30px', color: '#aaa', margin: 0 }}>
          Ваша корзина пуста
        </p>
      ) : (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '10px',
            background: '#2a2a2a',
            borderRadius: '8px'
          }}>
            <span>Сумма:</span>
            <span style={{ color: '#ff7b25', fontWeight: 'bold' }}>{cost} ₽</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '10px',
            background: '#2a2a2a',
            borderRadius: '8px'
          }}>
            <span>Количество:</span>
            <span style={{ color: '#ff7b25', fontWeight: 'bold' }}>{pizzaCount}</span>
          </div>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '20px 0',
            overflowY: 'auto',
            flexGrow: 1
          }}>
            {items.map((item) => (
              <li key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px',
                marginBottom: '15px',
                background: '#2a2a2a',
                borderRadius: '8px',
                borderLeft: '3px solid #ff7b25'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontWeight: 'bold', color: '#ff7b25' }}>{item.name}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.price} ₽</span>
                  <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Размер: {item.size} см</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Input
                    type={TypesInput.NUMBER}
                    initialValue={item.quantity}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value === 0) {
                        value = 1;
                      } else if (value > 20) {
                        value = 20;
                      }
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: value,
                        })
                      );
                    }}
                  />
                  <Button
                    text="Удалить"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    otherButtonStyles={{
                      background: 'transparent',
                      color: '#ff4d4d',
                      border: '1px solid #ff4d4d',
                      padding: '8px 12px',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <Button
            text="Оформить заказ"
            onClick={() => {
              navigate("/orderpage");
              handleCloseModal();
            }}
            otherButtonStyles={{
              width: '100%',
              padding: '12px',
              marginTop: '20px',
              background: '#ff7b25',
              color: '#121212',
              border: 'none',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          />
        </>
      )}
    </div>
  );
};

export default CartModalContent;