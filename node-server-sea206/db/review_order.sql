SELECT * 
FROM cart
JOIN products ON cart.productid = products.productid
WHERE userid = $1;