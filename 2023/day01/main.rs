use std::fs::read_to_string;

fn main() {
	let lines: Vec<String> = read_to_string("input.txt")
		.unwrap()
		.lines()
		.map(String::from)
		.collect();

	let mut sum: u32 = 0;

	for line in lines {
		let digits: Vec<u32> = line
			.chars()
			.filter_map(|c| c.to_digit(10))
			.collect();

		let digit: u32 = (digits[0].to_string() + &digits[digits.len() - 1].to_string())
			.parse()
			.unwrap();
		
		sum += digit;
	}

	println!("{sum}");
}