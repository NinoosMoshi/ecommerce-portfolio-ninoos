package com.ecommerce.dao;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);


    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

   // Page<Product> findByNameContainingOrSku(@RequestParam("name") String name, @RequestParam("sku") String sku, Pageable pageable);
}


//    @Query("select u from User u where u.firstname = :firstname or u.lastname = :lastname")
//    User findByLastnameOrFirstname(@Param("lastname") String lastname,
//                                   @Param("firstname") String firstname);



//    Page<Product> findByNameContainingOrSkuContaining(@RequestParam("name") String name, @RequestParam("sku") String sku, Pageable pageable);

//    @Query("select p from Product p where upper(p.name) like concat('%', upper(?1), '%') or upper(p.sku) like concat('%', upper(?2), '%') or upper(p.sku) like concat('%', upper(?3), '%')")
//    Page<Product> getByNames(String firstName, String sku, Pageable pageable);

//    @Query("SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name ,'%) or p.sku LIKE CONCAT('%', :sku ,'%)")
//    Page<Product> getByNames(String firstName, String sku, Pageable pageable);


