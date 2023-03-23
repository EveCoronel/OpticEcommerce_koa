let newOrderHtml = `<!DOCTYPE html>
<html>
<head>
	<title>Order Confirmation - SeeSharp</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			background-color: #f5f5f5;
		}
		h1 {
			font-size: 36px;
			text-align: center;
			color: #333;
			padding: 30px 0;
			margin: 0;
		}
		table {
			border-collapse: collapse;
			margin: 0 auto;
			width: 80%;
			background-color: #fff;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
		th, td {
			padding: 10px;
			text-align: left;
		}
		th {
			background-color: #f2f2f2;
			border-bottom: 1px solid #ddd;
		}
		tr:nth-child(even) {
			background-color: #f8f8f8;
		}
		img {
			display: block;
			max-width: 100%;
			height: auto;
			margin: 0 auto;
		}
	</style>
</head>
<body>
	<h1>SeeSharp: Thanks for your order!</h1>
    <br>
    <h3>Order number: <orderNumber> </h3>
    <br>
	<h3>Date: <createdAt> </h3>
    <br>
	<table>
		<thead>
			<tr>
				<th>Name</th>
                <th>Product</th>
                <th>Description</th>
				<th>Quantity</th>
				<th>Unity price</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
          <products>
		</tbody>
	</table>
    <br>
    <h3>Total to pay: <b>$UY <totalToPay></b> </h3>
</body>
</html>
` 

module.exports = newOrderHtml;