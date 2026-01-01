package src;

public class ArtItem {
    // ===============================
    // Fields / Attributes
    // ===============================
    private int id;
    private String title;
    private String artist;
    private double price;
    private String imageUrl;

    // ===============================
    // Constructors
    // ===============================

    // Default constructor (optional)
    public ArtItem() {
    }

    // Constructor with parameters
    public ArtItem(int id, String title, String artist, double price, String imageUrl) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // ===============================
    // Getter and Setter Methods
    // ===============================
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // ===============================
    // Utility Methods
    // ===============================
    @Override
    public String toString() {
        return "ArtItem{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", price=" + price +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
