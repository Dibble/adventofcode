use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    let mut score = 0;
    let mut group = 0;
    let mut group_items = Vec::new();

    if let Ok(lines) = read_lines("./input.txt") {
        for line in lines {
            if let Ok(ip) = line {
                // let compartment1 = &ip[..ip.len() / 2];
                // let compartment2 = &ip[ip.len() / 2..];
                // println!("{} {}", compartment1, compartment2);
                // let uniques = get_unique_chars(&compartment1);
                // println!("{:?}", uniques);

                // for i in 0..compartment2.len() {
                //   let c = compartment2.chars().nth(i).unwrap();
                //   if uniques.contains(&c) {
                //     let item_score = get_char_score(&c);
                //     println!("unique {} {}", &c, item_score);
                //     score += item_score;
                //     break;
                //   }
                // }

                group += 1;
                let elf_uniques = get_unique_chars(&ip);
                if group == 1 {
                    group_items = elf_uniques;
                } else {
                    let mut new_group_items = Vec::new();
                    for i in 0..group_items.len() {
                        let c = group_items[i];
                        if elf_uniques.contains(&c) {
                            new_group_items.push(c);
                        }
                    }
                    group_items = new_group_items;
                }

                if group == 3 {
                    score += get_char_score(&group_items[0]);
                    group_items = Vec::new();
                    group = 0;
                }
            }
        }
    }

    println!("{}", score);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

fn get_char_score(c: &char) -> usize {
    let mut chars: Vec<char> = ('a'..='z').collect();
    chars.append(&mut ('A'..='Z').collect::<Vec<char>>());

    let position = chars.iter().position(|i| i == c).unwrap();
    // println!("{} {}", c, position + 1);
    return position + 1;
}

fn get_unique_chars(input: &str) -> Vec<char> {
    let mut uniques = Vec::new();
    // let chars = input.chars();

    for i in 0..input.len() {
        let c = input.chars().nth(i).unwrap();
        if !uniques.contains(&c) {
            uniques.push(c);
        }
    }

    return uniques;
}
