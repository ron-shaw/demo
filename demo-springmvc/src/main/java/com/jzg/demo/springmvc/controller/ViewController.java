package com.jzg.demo.springmvc.controller;

import com.jzg.demo.springmvc.model.Customer;
import com.jzg.demo.springmvc.vo.CustomerContactVo;
import com.jzg.demo.springmvc.vo.CustomerListVo;
import com.jzg.demo.springmvc.vo.CustomerMapVo;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Arrays;
import java.util.Map;

/**
 * @description: ResultController
 * @author: JZG
 * @date: 2018/1/17 10:51
 * @version: v1.0.0
 */
@Controller
@RequestMapping("view")
public class ViewController {

    /**
     * 向页面传值    【演示页面】
     *
     * @param map      map
     * @param model    model
     * @param modelMap modelMap
     * @return
     */
    @RequestMapping("index")
    public String index(Map<String, Object> map, Model model, ModelMap modelMap) {
        map.put("citys", Arrays.asList("beijing", "shanghai", "guangzhou"));
        model.addAttribute("citeName", "this is cityName [Model]");
        modelMap.addAttribute("cityAttr", "city attirbute [ModelMap]");
        return "view/view";
    }

    /**
     * 向页面传值   【使用ModelAndView 演示页面】
     *
     * @return
     */
    @RequestMapping("index1")
    public ModelAndView index1() {
        ModelAndView modelAndView = new ModelAndView("view/view");
        Map map = new HashedMap();
        map.put("citys", Arrays.asList("beijing", "shanghai", "guangzhou"));
        modelAndView.addAllObjects(map);

        modelAndView.addObject("citeName", "this is cityName [Model]");

        ModelMap modelMap = new ModelMap();
        modelMap.addAttribute("cityAttr", "city attirbute [ModelMap]");
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }


    /**
     * 参数传递示例页面
     *
     * @return
     */
    @RequestMapping("toParam")
    public String toParam() {
        return "view/param";
    }

    /**
     * Redirect跳转页
     *
     * @param customer customer
     * @param model    model
     * @return
     */
    @RequestMapping("toInfo")
    public String toInfo(Customer customer, Model model) {
        System.out.println(customer.toString());

        model.addAttribute("id", customer.getId());
        model.addAttribute("loginName", customer.getLoginName() == null ? "" : customer.getLoginName());

        return "view/info";
    }


    /**
     * 3、前台向后端传参   【自定义复合对象】
     *
     * @param customerContactVo customerContactVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "getComObject", method = RequestMethod.POST)
    public CustomerContactVo getComObject(CustomerContactVo customerContactVo) {
        return customerContactVo;
    }


    /**
     * 4、前台向后端传参   【List对象】
     * <p>
     * 注意：Spring会创建一个以最大下标值为size的List对象。
     * 所以，如果表单中有动态添加行、删除行的情况，就需要特别注意，
     * 譬如一个表格，用户在使用过程中经过多次删除行、增加行的操作之后，下标值就会与实际大小不一致，
     * 这时候，List中的对象，只有在表单中对应有下标的那些才会有值，否则会为null。
     *
     * @param customerListVo customerListVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "getListObject", method = RequestMethod.POST)
    public CustomerListVo getListObject(CustomerListVo customerListVo) {
        return customerListVo;
    }


    /**
     * 5、前台向后端传参   【Map对象】
     *
     * @param customerMapVo customerMapVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "getMapObject", method = RequestMethod.POST)
    public CustomerMapVo getMapObject(CustomerMapVo customerMapVo) {
        return customerMapVo;
    }


    /**
     * 页面跳转
     *
     * @param customer customer
     * @return
     */
    @RequestMapping("/redirect")
    public String redirect(Customer customer) {
        return "redirect:/view/toInfo";
    }


    /**
     * 页面跳转带参数
     *
     * @param customer           customer
     * @param redirectAttributes redirectAttributes
     * @return
     */
    @RequestMapping("/redirectWithParam")
    public String redirectWithParam(Customer customer, RedirectAttributes redirectAttributes) {
        redirectAttributes.addAttribute("id", customer.getId());
        redirectAttributes.addAttribute("loginName", customer.getLoginName());
        return "redirect:/view/toInfo";
    }
}
