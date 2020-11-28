package edu.sjsu.directexchange.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class SplitOffer {

  public List<Offer> getOffers() {
    return splitOffersPair;
  }

  public SplitOffer() {
    splitOffersPair = new ArrayList<>();
  }
  public void setOffers(List<Offer> offers) {
    this.splitOffersPair = offers;
  }

  private List<Offer> splitOffersPair;

  public void addOffer(Offer offer) {
    this.splitOffersPair.add(offer);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    SplitOffer splitOffer = (SplitOffer) o;
    int id1 = splitOffer.getOffers().get(0).getId();
    int id2 = splitOffer.getOffers().get(1).getId();
    if((this.getOffers().get(0).getId() == id1 &&
          this.getOffers().get(1).getId() == id2) ||
      (this.getOffers().get(1).getId() == id1 &&
        this.getOffers().get(0).getId() == id2)) return true;

    return false;
    }

  @Override
  public int hashCode() {
    return Objects.hash(splitOffersPair);
  }
}
