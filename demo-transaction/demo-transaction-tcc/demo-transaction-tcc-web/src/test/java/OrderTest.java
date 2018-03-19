import com.jzg.demo.transaction.tcc.order.api.OrderService;
import com.jzg.demo.transaction.tcc.order.dto.OrderDto;
import com.jzg.demo.transaction.tcc.web.biz.OrderBiz;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;

import javax.annotation.Resource;

/**
 * @description: OrderTest
 * @author: JZG
 * @date: 2018/3/6 19:03
 * @version:
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:/spring/spring-context.xml")
public class OrderTest {
    @Resource
    OrderService orderService;
    @Resource
    OrderBiz orderBiz;

    @Test
    public void test() {
        Long maxId = orderService.getMaxId();
        OrderDto orderDto = new OrderDto();
        orderDto.setCustomerId(1L);
        orderDto.setProductId(1L);
        orderDto.setAmount(new BigDecimal("200"));
        orderDto.setQuantity(1);
        orderDto.setOrderId(maxId + 1);
        Long orderId = orderBiz.createOrder(orderDto);
    }
}
