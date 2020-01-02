var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

/*
var mysql = require("mysql");
var pool = mysql.createPool({
	connectionLimit : 10,
	host            : '127.0.0.1',
	user            : 'root',
	password        : '1234',
	database        : 'test'
});
*/

var pool = require('./dbcon.js').pool;

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 40011);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

//index page
app.get('/', function(req, res, next){
	var context = {};
    res.render('index', context);
});

//shop_order page
app.get('/shop_order_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Shop_order',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'userId': rows[row].User_id, 'orderDate': rows[row].Order_date, 'id':rows[row].Order_id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('shop_order_home', context);
    });
});

app.get('/shop_order_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Shop_order` (`User_id`, `Order_date`) VALUES (?, ?)',
    [req.query.userId, req.query.orderDate], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

// shop_user page
app.get('/shop_user_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Shop_user',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'phone': rows[row].Phone_number, 'email':rows[row].Email, 'id':rows[row].User_id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('shop_user_home', context);
    });
});

app.get('/shop_user_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Shop_user` (`First_name`, `Last_name`, `Phone_number`, `Email`) VALUES (?, ?, ?, ?)',
    [req.query.firstName, req.query.lastName, req.query.phone, req.query.email], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

app.get('/shop_user_update1',function(req, res, next){
    var context = {};
    pool.query('SELECT * FROM `Shop_user` WHERE User_id=?',
	[req.query.id], 
	function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		var params = [];

		for(var row in rows){
			var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'phone': rows[row].Phone_number, 'email':rows[row].Email, 'id':rows[row].User_id};       
			params.push(addItem);
		}

	context.results = params[0];
	res.render('shop_user_update', context);
    });
});

app.get('/shop_user_update2', function(req, res, next){
    var context = {};

    pool.query("SELECT * FROM `Shop_user` WHERE User_id=?",
	[req.query.id], 
	function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		
		var current = rows[0];
		
		pool.query('UPDATE `Shop_user` SET First_name=?, Last_name=?, Phone_number=?, Email=? WHERE User_id=?',
		[req.query.firstName || current.firstName, req.query.lastName || current.lastName, req.query.phone || current.phone, req.query.email || current.email, req.query.id],
		function(err, result){
			if(err){
				next(err);
				return;
			}
			
			pool.query('SELECT * FROM Shop_user',
			function(err, rows, fields){
			if(err){
				next(err);
				return;
			}
			var params = [];
			for(var row in rows){
				var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'phone': rows[row].Phone_number, 'email':rows[row].Email, 'id':rows[row].User_id};       
				params.push(addItem);
			}
			context.results = params;
			res.render('shop_user_home', context);
			});
		});	
    });
});

//order_to_product page
app.get('/order_to_product_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Order_to_product',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'orderId': rows[row].Order_id, 'productId': rows[row].Product_id, 'quantity': rows[row].Quantity, 'id':rows[row].id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('order_to_product_home', context);
    });
});

app.get('/order_to_product_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Order_to_product` (`Order_id`, `Product_id`, `Quantity`) VALUES (?, ?, ?)',
    [req.query.orderId, req.query.productId, req.query.quantity], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

//user_to_payment page
app.get('/user_to_payment_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM User_to_payment',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'userId': rows[row].User_id, 'paymentMethodId': rows[row].Payment_method_id, 'id':rows[row].id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('user_to_payment_home', context);
    });
});

app.get('/user_to_payment_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `User_to_payment` (`User_id`, `Payment_method_id`) VALUES (?, ?)',
    [req.query.userId, req.query.paymentMethodId], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

app.get('/user_to_payment_delete', function(req, res, next){
	//console.log(req.query);
	var context = {};
	pool.query("DELETE FROM `User_to_payment` WHERE id = ?",
	[req.query.id], 
    function(err, result){
        if(err){
            next(err);
            return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

//product page
app.get('/product_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Product',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'productDescription': rows[row].Product_description, 'productLocation': rows[row].Product_location, 'unitCost': rows[row].Unit_cost, 'unitPrice': rows[row].Unit_price, 'id':rows[row].Product_id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('product_home', context);
    });
});

app.get('/product_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Product` (`Product_description`, `Product_location`, `Unit_cost`, `Unit_price`) VALUES (?, ?, ?, ?)',
    [req.query.productDescription, req.query.productLocation, req.query.unitCost, req.query.unitPrice], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

app.get('/product_delete', function(req, res, next){
	//console.log(req.query);
	var context = {};
	pool.query("DELETE FROM `Product` WHERE id = ?",
	[req.query.id], 
    function(err, result){
        if(err){
            next(err);
            return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

//shipment page
app.get('/shipment_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Shipment',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'orderId': rows[row].Order_id, 'trackingNumber': rows[row].Tracking_number, 'addressLine1': rows[row].Address_line1, 'city': rows[row].City, 'state': rows[row].State, 'zip': rows[row].Zip, 'id':rows[row].Ship_id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('shipment_home', context);
    });
});

app.get('/shipment_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Shipment` (`Order_id`, `Tracking_number`, `Address_line1`, `City`, `State`, `Zip`) VALUES (?, ?, ?, ?, ?, ?)',
    [req.query.orderId, req.query.trackingNumber, req.query.addressLine1, req.query.city, req.query.state, req.query.zip], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

//payment_method page
app.get('/payment_method_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Payment_method',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'cardNumber': rows[row].Card_number, 'cardCvc': rows[row].Card_CVC, 'cardName': rows[row].Card_name, 'addressLine1': rows[row].Address_line1, 'city': rows[row].City, 'state': rows[row].State, 'zip': rows[row].Zip, 'id':rows[row].Payment_method_id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('payment_method_home', context);
    });
});

app.get('/payment_method_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Payment_method` (`Card_number`, `Card_CVC`, `Card_name`, `Address_line1`, `City`, `State`, `Zip`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.query.cardNumber, req.query.cardCvc, req.query.cardName, req.query.addressLine1, req.query.city, req.query.state, req.query.zip], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

//invoice page
app.get('/invoice_home', function(req, res, next){
	var context = {};
    pool.query('SELECT * FROM Invoice',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'orderId': rows[row].Order_id, 'amount': rows[row].Amount, 'id':rows[row].Invoice_id};       
        params.push(addItem);
    }
    context.results = params;
    res.render('invoice_home', context);
    });
});

app.get('/invoice_insert',function(req, res, next){
	//console.log(req.query);
    var context = {};
	pool.query('INSERT INTO `Invoice` (`Order_id`, `Amount`) VALUES (?, ?)',
    [req.query.orderId, req.query.amount], 
    function(err, result){
        if(err){
			next(err);
			return;
        }
		//console.log(result);
		context.id = result.insertId;
		res.send(JSON.stringify(context));
    });
});

//order_by_name page
app.get('/order_by_name_home', function(req, res, next){
	var context = {};
	pool.query('SELECT Shop_user.First_name, Shop_user.Last_name, Shop_order.Order_id, Shop_order.Order_date FROM Shop_user INNER JOIN Shop_order ON Shop_user.User_id = Shop_order.User_id',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'orderId': rows[row].Order_id, 'orderDate':rows[row].Order_date};       
        params.push(addItem);
    }
    context.results = params;
    res.render('order_by_name_home', context);
    });
});

app.get('/order_by_name_filter', function(req, res, next){
	var context = {};
	pool.query('SELECT Shop_user.First_name, Shop_user.Last_name, Shop_order.Order_id, Shop_order.Order_date FROM Shop_user INNER JOIN Shop_order ON Shop_user.User_id = Shop_order.User_id WHERE First_name = ? AND Last_name = ?',
    [req.query.firstName, req.query.lastName],
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }	
	
    var params = [];
    for(var row in rows){
        var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'orderId': rows[row].Order_id, 'orderDate':rows[row].Order_date};       
        params.push(addItem);
    }
    context.results = params;
    res.render('order_by_name_home', context);
	
    });
});

//tracking_by_order page
app.get('/tracking_by_order_home', function(req, res, next){
	var context = {};
	pool.query('SELECT Shipment.Tracking_number, Shop_order.Order_id, Shop_order.Order_date FROM Shipment INNER JOIN Shop_order ON Shipment.Order_id = Shop_order.Order_id',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'trackingNumber': rows[row].Tracking_number, 'orderId': rows[row].Order_id, 'orderDate':rows[row].Order_date};       
        params.push(addItem);
    }
    context.results = params;
    res.render('tracking_by_order_home', context);
    });
});

app.get('/tracking_by_order_filter', function(req, res, next){
	var context = {};
	pool.query('SELECT Shipment.Tracking_number, Shop_order.Order_id, Shop_order.Order_date FROM Shipment INNER JOIN Shop_order ON Shipment.Order_id = Shop_order.Order_id WHERE Shop_order.Order_id = ?',
    [req.query.orderId],
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }	
	
    var params = [];
    for(var row in rows){
        var addItem = {'trackingNumber': rows[row].Tracking_number, 'orderId': rows[row].Order_id, 'orderDate':rows[row].Order_date};         
        params.push(addItem);
    }
    context.results = params;
    res.render('tracking_by_order_home', context);
	
    });
});

//order_by_id page
app.get('/order_by_id_home', function(req, res, next){
	var context = {};
	pool.query('SELECT Shop_user.First_name, Shop_user.Last_name, Shop_order.Order_id, Shop_order.Order_date FROM Shop_user INNER JOIN Shop_order ON Shop_user.User_id = Shop_order.User_id',
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'orderId': rows[row].Order_id, 'orderDate':rows[row].Order_date};       
        params.push(addItem);
    }
    context.results = params;
    res.render('order_by_id_home', context);
    });
});

app.get('/order_by_id_filter', function(req, res, next){
	var context = {};
	pool.query('SELECT Shop_user.First_name, Shop_user.Last_name, Shop_order.Order_id, Shop_order.Order_date FROM Shop_user INNER JOIN Shop_order ON Shop_user.User_id = Shop_order.User_id WHERE Shop_order.Order_id = ?',
    [req.query.orderId],
	function(err, rows, fields){
    if(err){
        next(err);
        return;
    }	
	
    var params = [];
    for(var row in rows){
        var addItem = {'firstName': rows[row].First_name, 'lastName': rows[row].Last_name, 'orderId': rows[row].Order_id, 'orderDate':rows[row].Order_date};       
        params.push(addItem);
    }
    context.results = params;
    res.render('order_by_id_home', context);
	
    });
});










app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});